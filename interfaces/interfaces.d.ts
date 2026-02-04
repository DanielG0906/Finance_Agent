export interface UserDetails {
    $id: number;
    username: string;
    email: string;
    gender: string;
    firstName: string;
    $created_at: string;
    $updated_at: string;
}

export interface InputComponent {
    label: string;
    value: string;
    onChange: (text: string) => void;
    isFocused: boolean;
    onFocus: (bool: boolean) => void;
    onBlur: (bool: boolean) => void;
    placeholder: string;
    secureTextEntry?: boolean;
    error:string|null;
}

export interface SuccessModal {
    visible: boolean;
    onClose: () => void;
}