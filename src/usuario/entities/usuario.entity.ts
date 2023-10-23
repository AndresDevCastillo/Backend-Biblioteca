import { Prestamo } from 'src/prestamo/entities/prestamo.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  nombre: string;
  
  @Column({ type: 'varchar', length: 80 })
  apellido: string;

  @Column({ type: 'varchar', length: 15 })
  telefono: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({type: 'varchar', length: 256})
  contrasena: string;

  @ManyToOne(() => Rol, (rol) => rol.usuario)
  rol: Rol;

  @OneToMany(() => Prestamo, (prestamo) => prestamo.usuario)
  prestamo : Prestamo[];
}
