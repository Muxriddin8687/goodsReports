import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {

    constructor(@InjectClient() private readonly con: Connection) { }


    async create(data: ProductModel, user_id: number) {
        return this.con.query('INSERT `product`(`name`, `unit_id`, `group_id`, `user_id`) VALUES (?, ?, ?, ?)',
                                            [data.name, data.unit_id, data.group_id, user_id]);
    }


    async findAll(user_id: number) {
        const products = await this.con.query('SELECT * FROM `product_count` WHERE `user_id`=?', user_id);
        return products[0];
    }


    async findOne(id: number) {
        const product = await this.con.query('SELECT p.*, g.name AS group_name, u.name AS unit_name FROM `product` AS p, `product_group` AS g, `unit` AS u  WHERE p.unit_id=u.id AND p.group_id=g.id AND p.`id`=?', id);
        return product[0];
    }


    async update(id: number, data: ProductModel) {
        return await this.con
            .query('UPDATE `product` SET `name`=?, `unit_id`=?, `group_id`=? WHERE id=?',
                  [data.name, data.unit_id, data.group_id, id]);
    }


    async remove(id: number) {
        const products = await this.con.query('SELECT * FROM `action` WHERE `product_id`=?', id);

        if (products[0].length > 1)
            return await this.con.query('UPDATE `product` SET `is_active`=false WHERE id=?', id);
        else
            return await this.con.query('DELETE FROM `product` WHERE `id`=?', id);
    }
}
