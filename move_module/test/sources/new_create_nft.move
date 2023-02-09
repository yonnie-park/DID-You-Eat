module mint_nft::create_nft_with_resource_and_admin_accounts {
    use std::error;
    use std::string;
    use std::vector;

    use aptos_token::token;
    use std::signer;
    use std::string::String;
    use aptos_token::token::TokenDataId;
    use aptos_framework::account::SignerCapability;
    use aptos_framework::resource_account;
    use aptos_framework::account;

    // This struct stores an NFT collection's relevant information
    struct TokenMetaData has key {
        // Storing the signer capability here, so the module can programmatically sign for transactions
        token_data_id: TokenDataId,
    }

    struct SignData has key{
        signer_cap: SignerCapability,
        pause: bool,
    }

    /// Action not authorized because the signer is not the admin of this module
    const ENOT_AUTHORIZED: u64 = 1;
    /// The collection minting is expired
    const ECOLLECTION_EXPIRED: u64 = 2;
    /// The collection minting is disabled
    const EMINTING_DISABLED: u64 = 3;

    fun init_module(resource_signer: &signer) {
        // Save resource account sign data at 'SignData' struct
        let resource_signer_cap = resource_account::retrieve_resource_account_cap(resource_signer, @source_addr);
        move_to(resource_signer, SignData {
            signer_cap: resource_signer_cap,
            pause: true,
        });
    }

    public entry fun create_collection(collection_name: string::String, description: string::String, collection_uri: string::String) acquires SignData{
        let maximum_supply = 0;
        let mutate_setting = vector<bool>[ false, false, false ];

        let sign_data = borrow_global_mut<SignData>(@mint_nft);
        let server_signer = account::create_signer_with_capability(&sign_data.signer_cap);

        // Create the nft collection at resource account.
        token::create_collection(&server_signer, collection_name, description, collection_uri, maximum_supply, mutate_setting);
    }

    public entry fun new_token(minter: &signer, collection_name: string::String, token_name:string::String, token_uri:string::String) acquires SignData{
      let sign_data = borrow_global_mut<SignData>(@mint_nft);
      let server_signer = account::create_signer_with_capability(&sign_data.signer_cap);
      // Create a token data id to specify the token to be minted.
      let token_data_id = token::create_tokendata(
          &server_signer,
          collection_name,
          token_name,
          string::utf8(b""),
          0,
          token_uri,
          signer::address_of(minter),
          1,
          0,
          token::create_token_mutability_config(
              &vector<bool>[ false, false, false, false, true ]
          ),
          vector<String>[string::utf8(b"given_to")],
          vector<vector<u8>>[b""],
          vector<String>[ string::utf8(b"address") ],
      );
      move_to(minter, TokenMetaData {
          token_data_id,
      });
    }

    public entry fun mint_event_ticket(receiver: &signer, minter: address) acquires SignData, TokenMetaData{
        // Get resource account signed data
        let sign_data = borrow_global_mut<SignData>(@mint_nft);
        let token_data = borrow_global_mut<TokenMetaData>(minter);

        // Check the config of this module to see if we enable minting tokens from this collection
        assert!(sign_data.pause, error::permission_denied(EMINTING_DISABLED));

        // Mint a token at resource account
        let resource_signer = account::create_signer_with_capability(&sign_data.signer_cap);
        // Transfer the token from resource account to user account
        let token_id = token::mint_token(&resource_signer, token_data.token_data_id, 1);
        token::direct_transfer(&resource_signer, receiver, token_id, 1);

        let (creator_address, collection, name) = token::get_token_data_id_fields(&token_data.token_data_id);
        token::mutate_token_properties(
            &resource_signer,
            signer::address_of(receiver),
            creator_address,
            collection,
            name,
            0,
            1,
            vector::empty<String>(),
            vector::empty<vector<u8>>(),
            vector::empty<String>(),
        );
    }

    /// Set if minting is enabled for this minting contract.
    public entry fun set_minting_enabled(caller: &signer, minting_enabled: bool) acquires SignData {
        let caller_address = signer::address_of(caller);
        // Abort if the caller is not the admin of this module.
        assert!(caller_address == @admin_addr, error::permission_denied(ENOT_AUTHORIZED));
        let module_data = borrow_global_mut<SignData>(@source_addr);
        module_data.pause = minting_enabled;
    }
}
