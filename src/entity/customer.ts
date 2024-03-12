export default class Customer {

    _id: string;
    _name: string;
    _address: Address;
    _active: boolean = true;

    constructor(id: string, name: string, address: Address) {
        this._id = id;
        this._name = name;
        this._address = address;
        this.validate(); //Aqui é um exemplo de como podemos validar o objeto (autovalidation principle)
    }

    //A diferença entre o setName e o changeName é que o setName está na classe por estar
    //Já o changeName traz consigo a intenção de mudar o nome do cliente a partir de uma regra de negócio
    changeName(newName: string) {
        this._name = newName;
    }

    //A modelagem do domínio rico expressa CLARAMENTE a necessidade do negócio
    activate() {
        if(this._address === null || this._address === undefined) {    
            throw new Error("The address is required to activate the customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Nome inválido");
        }
        if (this._name.length === 0) {
            throw new Error("Nome inválido");
        }
    }

    setAddress(address: Address) {  
        this._address = address;
    }
}