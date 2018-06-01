import { BaseEntity } from './../../shared';

export const enum Sgdb {
    'MYSQL',
    'MARIADB',
    'ORACLE',
    'POSTGRESQL',
    'SQLSERVER'
}

export const enum Tipo {
    'HOMOLOGACAO',
    'PRODUCAO',
    'REPLICACAO',
    'BACKUP'
}

export class Servidores implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public sgdb?: Sgdb,
        public tipo?: Tipo,
        public nomes?: BaseEntity[],
    ) {
    }
}
