import { Injectable } from '@nestjs/common';
import { Connection } from 'mysql2';
import { InjectClient } from 'nest-mysql';
import { ActionModel } from './action.model';

@Injectable()
export class ActionService {

    constructor(@InjectClient() private readonly con: Connection) { }


    async create(data: ActionModel[], user_id: number) {
        let sql = 'INSERT `action`(`product_id`, `user_id`, `count`) VALUES ';

        data.forEach(item => {
            sql += `('${item.product_id}', '${user_id}', '${item.count}'),`;
        });

        sql = sql.slice(0, -1);

        return this.con.query(sql);
    }


    async findAll(user_id: number) {
        const data = await this.con.query('SELECT * FROM `actions` WHERE `user_id`=? ORDER BY `date` DESC', user_id);
        return data[0];
    }


    async getByFilter(filterData: any, user_id: number) {

        // let filterData = {
        //     start_date: '',
        //     end_date: '',
        //     product_id: 0,
        //     group_id:0
        // };


        let start_date = '', end_date = '', product = '', group = '';


        if (filterData.start_date != null) {
            start_date = `date >= '${filterData.start_date}'`;
        }
        if (filterData.end_date != null) {
            end_date = (start_date.length > 3) ? ' AND ' : '';
            end_date += `date <= '${filterData.end_date}'`;
        }
        if (filterData.product_id.length > 0) {
            product = (start_date.length > 3 || end_date.length > 3) ? ' AND ' : '';
            product += 'product_id = ' + filterData.product_id;
        }
        if (filterData.group_id.length > 0) {
            group = (start_date.length > 3 || end_date.length > 3 || product.length > 3) ? ' AND ' : '';
            group += 'group_id = ' + filterData.group_id;
        }
        if (group == '' && product == '' && (start_date != '' || end_date != '')) {
            product = ' AND user_id=' + user_id;
        }


        let sql = `SELECT * FROM actions WHERE ${start_date + end_date + product + group}`;

        const data = await this.con.query(sql);
        return data[0];
    }


    async remove(id: number) {
        return await this.con.query('DELETE FROM `action` WHERE `id`=?', id);
    }
}
