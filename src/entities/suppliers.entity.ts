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
import { ProductEntity } from './products.entity';


@Entity('suppliers', { schema: 'proveedores' })
export class SupplierEntity {
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
  @OneToMany(() => ProductEntity, (product) => product.supplier)
  product: ProductEntity;
  //----------

  @Column('varchar', {
    name: 'name',
    nullable: false,
    comment: 'Company Name',
  })
  name: string;

  @Column('varchar', {
    name: 'address',
    nullable: false,
    comment: 'Direction',
  })
  address: string;

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
