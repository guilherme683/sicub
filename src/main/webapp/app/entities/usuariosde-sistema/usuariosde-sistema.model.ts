import { BaseEntity } from './../../shared';

export const enum Sgdb {
    'MYSQL',
    'MARIADB',
    'ORACLE',
    'POSTGRESQL',
    'SQLSERVER'
}

export const enum Area {
    'SNH',
    'SNSA',
    'SEMOB',
    'SNAPU',
    'CGLOG',
    'CGMI',
    'DENATRAN',
    'ASPAR',
    'CONJUR',
    'PROTOCOLO',
    'PATRIMONIO'
}

export class UsuariosdeSistema implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public senha?: string,
        public sgdb?: Sgdb,
        public base?: string,
        public esquema?: string,
        public descricaoBase?: string,
        public solicitante?: string,
        public ramal?: number,
        public email?: string,
        public area?: Area,
        public dataCriacao?: any,
        public servidores?: BaseEntity[],
    ) {
    }
}
