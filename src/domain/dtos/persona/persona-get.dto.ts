import z, { object } from "zod";

const PersonaGetDtoSchema = z.object({
  nombre: z.string({
    invalid_type_error: "nombre title must be a string",
    required_error: "nombre title is required",
  }),
  apellido: z.string({
    invalid_type_error: "apellido title must be a string",
    required_error: "apellido title is required",
  }),
  edad: z.number({
    invalid_type_error: "edad must be a int",
    required_error: "edad is required",
  }),
});

export class PersonaGetDto {
  private constructor(
    public nombre: string,
    public apellido: string,
    public edad: number
  ) {}

  static create(object: { [key: string]: any }): [string?, PersonaGetDto?] {
    // const result = PersonaGetDtoSchema.safeParse(object);
    // if (!result.success) {
    //   const err = result.error.errors[0].message;
    //   return [err, undefined];
    // }
    const { nombre, apellido, edad } = object;
    return [undefined, new PersonaGetDto(nombre, apellido, edad)];
  }
}
