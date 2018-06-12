import { BaseEntity } from './../../shared';

export const enum Sgdb {
    'MYSQL',
    'MARIADB',
    'ORACLE',
    'POSTGRESQL',
    'SQLSERVER'
}

export class Scripts implements BaseEntity {
    constructor(
        public id?: number,
        public acao?: string,
        public comando?: string,
        public sgdb?: Sgdb,
    ) {
    }
}
