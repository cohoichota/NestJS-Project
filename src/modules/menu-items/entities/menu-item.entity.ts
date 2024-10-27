import { MenuItemOption } from 'src/modules/menu-item-options/entities/menu-item-option.entity';
import { Menu } from 'src/modules/menus/entities/menu.entity';
import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'menu_items' }) // Optional: specify the table name
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field if needed

  @ManyToOne(() => Menu, (menu) => menu.items, { eager: true }) // Use eager loading to automatically load menu data
  menu: Menu;

  @OneToMany(() => MenuItemOption, (menuItemOption) => menuItemOption.menuItem) // Establish one-to-many relationship with MenuItemOption
  options: MenuItemOption[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order) // Establish one-to-many relationship with OrderDetail
  orderDetails: OrderDetail[];

  @Column({ nullable: false }) // You can specify additional options as needed
  title: string;

  @Column({ nullable: true }) // Allow nullable values for optional fields
  description: string;

  @Column({ type: 'decimal', default: 0 }) // Type decimal for price; default to 0
  basePrice: number;

  @Column({ nullable: true }) // Allow nullable values for optional fields
  image: string;

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
