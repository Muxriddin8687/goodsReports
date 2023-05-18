import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { UnitModel } from './unit.model';

@Injectable()
export class UnitService {
    constructor(@InjectClient() private readonly con: Connection) { }


    async create(data: UnitModel, user_id: number) {
        return this.con.query('INSERT `unit`(`name`, `user_id`) VALUES (?, ?)',
                                            [data.name, user_id]);
    }


    async findAll(user_id: number) {
        const data = await this.con.query('SELECT * FROM `unit` WHERE `user_id`=?', user_id);
        return data[0];
    }


    async findOne(id: number) {
        const data = await this.con.query('SELECT * FROM `unit` WHERE id=?', id);
        return data[0];
    }


    async update(id: number, data: UnitModel) {
        return await this.con
            .query('UPDATE `unit` SET `name`=? WHERE id=?', [data.name, id]);
    }


    async remove(id: number) {
        return await this.con.query('DELETE FROM `unit` WHERE `id`=?', id);
    }
}
