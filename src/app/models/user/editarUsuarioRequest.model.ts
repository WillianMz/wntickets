export class EditarUsuarioRequest {
    public contaUsuarioId: string;
    public nome: string;
    public email: string;
    public emailConfirmado: boolean;
    public telefone: string;
    public telefoneConfirmado: boolean;
    public twoFactorEnabled: boolean;
    public lockoutEnabled: boolean;
}