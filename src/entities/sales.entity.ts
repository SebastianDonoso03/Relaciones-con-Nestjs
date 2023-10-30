//Sebastian Donoso - Lenin Montalvo

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillEntity } from './bills.entity';
import { ProductEntity } from './products.entity';

@Entity('sales', { schema: 'ventas' })
export class SaleEntity {
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
  @ManyToOne(() => BillEntity, (bill) => bill.sale)
  bill: BillEntity;
  @ManyToOne(() => ProductEntity, (product) => product.sale)
  product: ProductEntity;
  //----------

  @Column('number', {
    name: 'bills',
    nullable: false,
    comment: 'Number of the bill',
  })
  bills: number;

  @Column('varchar', {
    name: 'nproduct',
    nullable: false,
    comment: 'Product Name',
  })
  nproduct: string;

  @Column('number', {
    name: 'amount',
    nullable: false,
    comment: 'Quantity of products',
  })
  amount: number;

  @BeforeInsert()
  @BeforeUpdate()
  async setProduct() {
    if (!this.nproduct) {
      return;
    }
    this.nproduct = this.nproduct.toUpperCase().trimEnd();
  }
}
