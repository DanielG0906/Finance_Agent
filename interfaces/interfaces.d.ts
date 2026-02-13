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
export interface Category {
    $id: string;
    categoryID: number;
    categoryDescEng: string;
    categoryDescHeb: string;
    $created_at: string;
    $updated_at: string;
}

export interface subCategory {
    $id: string;
    subCategoryID: number;
    subCategoryDescEng: string;
    subCategoryDescHeb: string;
    icon:string;
    $created_at: string;
    $updated_at: string;
}

interface Expense {
    $id: string;
    userID: number;
    categoryID:Category;
    subCategoryID: subCategory;
    onDate:string;
    amount: number;
    icon: string;
    comment: string;
    status:boolean;
    lastUpdateDate: string;
    $created_at: string;
    $updated_at: string;

}

interface ExpenseItemProps {
    expense: Expense;
    isRTL: boolean;
    index: number;
}