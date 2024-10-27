import { MenuItem } from 'src/modules/menu-items/entities/menu-item.entity';
import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'menu_item_options' }) // Optional: specify the table name
export class MenuItemOption {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field if needed

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.options, { eager: true }) // Use eager loading to automatically load menu item data
  menuItem: MenuItem;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order) // Establish one-to-many relationship with OrderDetail
  orderDetails: OrderDetail[];

  @Column({ nullable: false }) // You can specify additional options as needed
  title: string;

  @Column({ nullable: true }) // Allow nullable values for optional fields
  description: string;

  @Column({ type: 'decimal', default: 0 }) // Type decimal for price; default to 0
  additionalPrice: number;

  @Column({ nullable: true }) // Allow nullable values for optional fields
  optionalDescription: string;

  // If you want to include timestamps, add these fields:
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
