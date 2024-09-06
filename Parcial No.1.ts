//ANGIE MELISSA SANTIAGO RODRIGUEZ - 1555123

type Clave = string | number;
type Valor = any; //DECLARO EL VALOR EN ANY PARA QUE ACEPTE CUALQUIER TIPO DE VALOR SIN IMPORTAR QUE SEA

type Producto = {
  Nombre: string;
  Codigo: string;
  Precio_Costo: number;
  Precio_Venta: number;
};

class HashTable {
    private Tabla: Array<Array<[Clave, Valor]>>; 
    private CapacidadInicial: number; 
    private NoElementos: number; 

    //CONTRUCTOR PARA LA TABLA HASH
    constructor(CapacidadInicial: number = 20) { //SOLO ES UN NUMERO DE EJEMPLO QUE SE PUEDE CAMBIAR CUANDO SEA
        this.CapacidadInicial = CapacidadInicial; 
        this.Tabla = new Array(CapacidadInicial); 
        this.NoElementos = 0; 
    }

    private Hash(clave: Clave): number {
        if (typeof clave === "number") {
            return clave % this.CapacidadInicial;
        } else {
            let hash = 0;
            for (let i = 0; i < clave.length; i++) {
                hash += clave.charCodeAt(i);
            }
            return hash % this.CapacidadInicial;
        }
    }

    Set(clave: Clave, valor: Valor): void {
        const indice = this.Hash(clave);
        if (!this.Tabla[indice]) {
            this.Tabla[indice] = [];
        }
        
        for (let i = 0; i < this.Tabla[indice].length; i++) {
            if (this.Tabla[indice][i][0] === clave) {
                this.Tabla[indice][i][1] = valor;
                return;
            }
        }
       
        this.Tabla[indice].push([clave, valor]);
        this.NoElementos++;

        if (this.NoElementos / this.CapacidadInicial > 0.7) {
            this.Resize(this.CapacidadInicial * 2);
        }
    }

    //FUNCION PARA OBTENER LOS PRODUCTOS POR MEDIO DE LA CLAVE
    Get(clave: Clave): Valor | undefined {
        const indice = this.Hash(clave);
        if (!this.Tabla[indice]) return undefined;

        for (let i = 0; i < this.Tabla[indice].length; i++) {
            if (this.Tabla[indice][i][0] === clave) {
                return this.Tabla[indice][i][1];
            }
        }

        return undefined;
    }

    //FUNCION PARA ELIMINAR VALORES EN LA TABLA HASH
    Remove(clave: Clave): boolean {
        const indice = this.Hash(clave);
        if (!this.Tabla[indice]) return false;

        for (let i = 0; i < this.Tabla[indice].length; i++) {
            if (this.Tabla[indice][i][0] === clave) {
                this.Tabla[indice].splice(i, 1);
                this.NoElementos--;
                return true;
            }
        }

        return false;
    }
    
    //FUNCION PARA REDIMENSIONAR LA TABLA HASH EN DADO CASO SE INGRESEN MAS VALORES DE LOS PERMITIDOS
    private Resize(nuevaCapacidad: number): void {
        const tablaAntigua = this.Tabla;
        this.Tabla = new Array(nuevaCapacidad);
        this.CapacidadInicial = nuevaCapacidad;
        this.NoElementos = 0;

        for (let i = 0; i < tablaAntigua.length; i++) {
            if (tablaAntigua[i]) {
                for (const [clave, valor] of tablaAntigua[i]) {
                    this.Set(clave, valor);
                }
            }
        }
    }
}

//INDENTACION
const TablaHash = new HashTable (20);
//INGRESO LOS PRODUCTOS
const Productos: Array<[Clave, Producto]> = [
    [
        "P001",
        {
            Nombre: "Peptobismol",
            Codigo: "P001",
            Precio_Venta: 50,
            Precio_Costo: 60,
        },
    ],
    [
        "P002",
        {
            Nombre: "Panadol",
            Codigo: "P002",
            Precio_Venta: 1.5,
            Precio_Costo: 2,
        },
    ],
    [
        "P003",
        {
            Nombre: "ViroGrip Dia",
            Codigo: "P003",
            Precio_Venta: 1,
            Precio_Costo: 3,
        },
    ],
    [
        "P004",
        {
            Nombre: "Dorival",
            Codigo: "P004",
            Precio_Venta: 1,
            Precio_Costo: 2,
        },
    ],
    [
        "P005",
        {
            Nombre: "DoloNeurobion",
            Codigo: "P005",
            Precio_Venta: 75,
            Precio_Costo: 90,
        },
    ],
    [
        "P006",
        {
            Nombre: "Phanerval",
            Codigo: "P006",
            Precio_Venta: 25,
            Precio_Costo: 35,
        },
    ],
    [
        "P007",
        {
            Nombre: "Loratadina",
            Codigo: "P007",
            Precio_Venta: 15,
            Precio_Costo: 25,
        },
    ],
    [
        "P008",
        {
            Nombre: "Desloratadina",
            Codigo: "P008",
            Precio_Venta: 18,
            Precio_Costo: 30,
        },
    ],
    [
        "P009",
        {
            Nombre: "Bactid",
            Codigo: "P009",
            Precio_Venta: 20,
            Precio_Costo: 25.5,
        },
    ],
    [
        "P010",
        {
            Nombre: "ViroGrip Noche",
            Codigo: "P010",
            Precio_Venta: 1.5,
            Precio_Costo: 3,
        },
    ],
    [
        "P011",
        {
            Nombre: "PRODUCTO ELIMINADO DE EJEMPLO",
            Codigo: "P011",
            Precio_Venta: 9.99,
            Precio_Costo: 10,
        },
    ],
];

//AGREGAR CADA PRODUCTO A LA TABLA HASH UTILIZANDO SU NUEMRO E CLAVE
Productos.forEach(([clave, Producto]) => {
    TablaHash.Set(clave, Producto);
});

//MOSTRAR LA INFROMACION DE LOS PRODUCTOS POR MEDIO DE SU CODIGO DE PRODUCTO
console.log("\nINFROMACION DE TODOS LOS PRODUCTOS INGRESADOS")
console.log("Informacion de Producto 'P001'",TablaHash.Get("P001"));
console.log("Informacion de Producto 'P002'",TablaHash.Get("P002"));
console.log("Informacion de Producto 'P003'",TablaHash.Get("P003"));
console.log("Informacion de Producto 'P004'",TablaHash.Get("P004"));
console.log("Informacion de Producto 'P005'",TablaHash.Get("P005"));
console.log("Informacion de Producto 'P006'",TablaHash.Get("P006"));
console.log("Informacion de Producto 'P007'",TablaHash.Get("P007"));
console.log("Informacion de Producto 'P008'",TablaHash.Get("P008"));
console.log("Informacion de Producto 'P009'",TablaHash.Get("P009"));
console.log("Informacion de Producto 'P010'",TablaHash.Get("P010"));
console.log("Infromacion de Producto 'P011'",TablaHash.Get("P011"));

//BUSCAR LOS PRODUCTOS
console.log("\nINFROMACION DE UN PRODUCTO BUSCADO POR SU NUMERO DE CODIGO")
console.log("Informacion de Producto 'P001'",TablaHash.Get("P001"));

//ELIMINAR PRODUCTOS DE LA TABLA HASH USANDO SU NUMERO DE CLAVE
console.log("\nINFROMACION ACERCA DE UN PRODUCTO ELIMINADO")
console.log("Eliminar 'P011':", TablaHash.Remove("P011"));
console.log("Información de 'P011' después de eliminarlo:", TablaHash.Get("P011"));
