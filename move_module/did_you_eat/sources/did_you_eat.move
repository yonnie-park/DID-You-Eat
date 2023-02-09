module pub_addr::did_you_eat {
    use std::vector;
    use std::error;

    use std::signer;
    use std::string::String;
    use aptos_framework::account::SignerCapability;
    use aptos_framework::resource_account;

    struct CollectionData has store, drop{
        total_supply: u64,
        name: String,
        uri: String,
    }

    struct Collections has key{
        collection_lists: vector<CollectionData>
    }

    struct Token has store, drop{
        token_id : u64,
        collection_name: String,
        uri: String
    }

    struct TokenStore has key{
        token_lists: vector<Token>,
        total: u64,
    }

    struct SignData has key{
        signer_cap: SignerCapability,
        pause: bool,
        id: u64,
    }

    const NO_COLLECTION: u64 = 1;
    const EMINTING_DISABLED: u64 = 2;
    const ENOT_AUTHORIZED: u64 = 3;

    fun init_module(resource_signer: &signer){
        let resource_signer_cap = resource_account::retrieve_resource_account_cap(resource_signer, @source_addr);
        move_to(resource_signer, SignData {
            signer_cap: resource_signer_cap,
            pause: false,
            id: 0,
        });
    }

    public fun add_collection_data(name: String, uri: String) : CollectionData{
        CollectionData{total_supply: 0, name, uri,}
    }

    public fun add_token(token_id: u64, collection_name: String, uri: String) : Token{
        Token{token_id, collection_name, uri}
    }

    public entry fun create_collection(minter: &signer, name: String, uri: String) acquires Collections{
        let collection_data = add_collection_data(name, uri);
        
        if(!exists<Collections>(signer::address_of(minter))){
            let collection_list: vector<CollectionData> = vector::empty();
            vector::push_back(&mut collection_list, collection_data);
            
            move_to(minter, Collections{
                collection_lists: collection_list,
            });

            return
        };

        let minter_addr = signer::address_of(minter);
        let collections= borrow_global_mut<Collections>(minter_addr);
        
        vector::push_back(&mut collections.collection_lists, collection_data);
        
    }

    public entry fun mint_token(receiver: &signer, owner: address, collection_name: String) acquires Collections, TokenStore, SignData{
        
        let sign_data = borrow_global_mut<SignData>(@pub_addr);
        assert!(!sign_data.pause, error::permission_denied(EMINTING_DISABLED));

        assert!(exists<Collections>(owner), error::permission_denied(NO_COLLECTION));
        let collections = borrow_global_mut<Collections>(owner);
        
        let vector_len = vector::length(&mut collections.collection_lists);

        let i = 0;
        while(i < vector_len){
            if(vector::borrow(&collections.collection_lists, i).name == collection_name){
                break
            };
            i = i+1;
        };

        let collection_data = vector::borrow(&collections.collection_lists, i);

        let token = add_token(sign_data.id, collection_data.name, collection_data.uri);
        sign_data.id = sign_data.id + 1;

        if(!exists<TokenStore>(signer::address_of(receiver))){
            let token_list: vector<Token> = vector::empty();
            vector::push_back(&mut token_list, token);
            
            move_to(receiver, TokenStore{
                token_lists: token_list,
                total: 1
            });

            return
        };

        let receiver_addr = signer::address_of(receiver);
        let tokens= borrow_global_mut<TokenStore>(receiver_addr);

        vector::push_back(&mut tokens.token_lists, token);
        tokens.total = tokens.total + 1;
    }

    public entry fun set_pause(caller: &signer, _pause: bool) acquires SignData {
        let caller_address = signer::address_of(caller);

        assert!(caller_address == @admin_addr, error::permission_denied(ENOT_AUTHORIZED));
        let sign_data = borrow_global_mut<SignData>(@pub_addr);
        sign_data.pause = _pause; 
    }

}
