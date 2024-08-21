export class Miembro {
    public nuIdMiembro: number | null = null
    public txnombre: string = ''
    public txSituacion: string = ''
    public txabreviatura: string = ''
    public tx_item_description: string =''
    public nu_item: number | null = null
    public created_at: Date | null = null
    public dominio: string = ''

}

export class ApiResponse {
    public responseCode: string = '';
    public responseMessage: string = '';
    public response: any;
}
export class Base {
    public responseCode: number | null = null;
    public msgResultado: string = '';
    public response: any;
}

export class Parametro {
    public nuIdParametro: number | null = null
    public txNombre: string | null = ''
    public txAbreviatura: string|null = ''
    public nuItemNro: number | null = null
    public txItemDescripcion: string | null = null
    public isSelected: string | null = null
    public txUseCreado: string | null = null
    public txUseModificado: string | null = null
}


export class DocumentoGestion {
    public id: number | null = null
    public codigo: string | null = ''
    public nombre: string | null = ''
    public descripcion: string|null = ''
    public costo: number | null = null
    public recursos: string | null = null
    public estado: boolean | null = null
    public txUseCreado: string | null = null
    public txUseModificado: string | null = null
    public domain_id: number | null = null;
    public user_id: number | null = null;
}

export class Capacitaciones {
    public id: number | null = null
    public codigo: string | null = ''
    public nombre: string | null = ''
    public horas: number|null = 0
    public sylabus: string | null = null
    public temas: string | null = null
    public estado: boolean | null = null
    public fecha: any | null = null

    public idDocente: number|null = 0
    public docente: number | undefined | null = null

    public idEstado: number|null = null
    public etapa: string | null = null
    public txUseCreado: string | null = null
    public txUseModificado: string | null = null
}

export class SelectDocente {
    public id: number | null = null
    public nombres: string | null = ''
    public isSelected: string | null = null
}
