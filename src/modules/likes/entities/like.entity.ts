import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'likes' }) // Optional: specify the table name
export class Like {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field if needed

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.likes, {
    eager: true,
  }) // Use eager loading to automatically load restaurant data
  restaurant: Restaurant;

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
