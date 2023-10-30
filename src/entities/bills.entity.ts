//Sebastian Donoso - Lenin Montalvo

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientEntity } from './clients.entity';
import { SaleEntity } from './sales.entity';

@Entity('bills', { schema: 'factura' })
export class BillEntity {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'Current_timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_At',
    type: 'timestamp',
    default: () => 'Current_timestamp',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_At',
    type: 'timestamp',
    nullable: false,
  })
  deleteAt: Date;

  // Relaciones
  @ManyToOne(() => ClientEntity, (client) => client.bill)
  client: ClientEntity;
  @OneToMany(() => SaleEntity, (sale) => sale.bill)
  sale: SaleEntity;
  //----------

  @Column('varchar', {
    name: 'bill',
    nullable: false,
    comment: 'Name Bill',
  })
  bill: string;

  @Column('date', {
    name: 'date',
    nullable: false,
    comment: 'Date',
  })
  date: Date;

  @Column('varchar', {
    name: 'name',
    nullable: false,
    comment: 'Client name',
  })
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setBill() {
    if (!this.bill) {
      return;
    }
    this.bill = this.bill.toUpperCase();
  }
}
