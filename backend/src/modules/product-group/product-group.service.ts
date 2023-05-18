import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { ProductGroupModel } from './product-group.model';

@Injectable()
export class ProductGroupService {

    constructor(@InjectClient() private readonly con: Connection) { }


    async create(data: ProductGroupModel, user_id: number) {
        return this.con.query('INSERT `product_group`(`name`, `user_id`) VALUES (?, ?)',
                                            [data.name, user_id]);
    }


    async findAll(user_id: number) {
        const data = await this.con.query('SELECT * FROM `product_group` WHERE `user_id`=?', user_id);
        return data[0];
    }


    async findOne(id: number) {
        const data = await this.con.query('SELECT * FROM `product_group` WHERE id=?', id);
        return data[0];
    }


    async update(id: number, data: ProductGroupModel) {
        return await this.con
            .query('UPDATE `product_group` SET `name`=? WHERE id=?', [data.name, id]);
    }


    async remove(id: number) {
        return await this.con.query('DELETE FROM `product_group` WHERE `id`=?', id);
    }
}
