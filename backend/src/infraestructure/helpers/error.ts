export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class MissingUnidadError extends Error {
  public readonly ueCode: string;
  constructor(ueCode: string) {
    super(`UnidadEjecutora con código UE="${ueCode}" no existe.`);
    this.name = "MissingUnidadError";
    this.ueCode = ueCode;
  }
}
