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
import { SaleEntity } from './sales.entity';
import { SupplierEntity } from './suppliers.entity';
import { CategoryEntity } from './category.entity';

@Entity('products', { schema: 'productos' })
export class ProductEntity {
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
  @OneToMany(() => SaleEntity, (sale) => sale.product)
  sale: SaleEntity;
  @ManyToOne(() => SupplierEntity, (supplier) => supplier.product)
  supplier: SupplierEntity;
  @ManyToOne(() => CategoryEntity, (category) => category.product)
  category: CategoryEntity;
  //----------

  @Column('varchar', {
    name: 'description',
    nullable: false,
    comment: 'Product description',
  })
  description: string;

  @Column('number', {
    name: 'price',
    nullable: false,
    comment: 'product price',
  })
  price: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setDescription() {
    if (!this.description) {
      return;
    }
    this.description = this.description.toUpperCase();
  }
}
