//Sebastian Donoso - Lenin Montalvo

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillEntity } from './bills.entity';

@Entity('clients', { schema: 'clientes' })
export class ClientEntity {
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
  @OneToMany(() => BillEntity, (bill) => bill.client)
  bill: BillEntity;
  //----------

  @Column('varchar', {
    name: 'name',
    nullable: false,
    comment: 'Name',
  })
  name: string;

  @Column('varchar', {
    name: 'address',
    nullable: false,
    comment: 'Direction',
  })
  direction: string;

  @Column('number', {
    name: 'phone',
    nullable: false,
    comment: 'Cell phone number',
  })
  phone: number;

  @BeforeInsert()
  @BeforeUpdate()
  async setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase();
  }
}
