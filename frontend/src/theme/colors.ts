
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';


export interface AppColors {
  primary: string;   
  primaryHover: string,    
  secondary: string;     
  background: string;    
  text: string;          
  icon: string;          
  border: string;        
  shadow: string;        
  success: string;       
  warning: string;       
  error: string;         
  tabIconDefault: string; 
  tabIconSelected: string; 
  tint: string

  // Buttons & Interactive Elements
  buttonBackground: string;     
  buttonText: string;           
  buttonSecondary: string;      
  buttonSecondaryText: string;
  buttonHover: string, 

  // input & form
  inputBackground: string;
  inputText: string;
  inputBorder: string;
  inputFocusBorder: string;
  inputLabel: string; 
  inputPlaceholder: string,
  inputHover: string;
  inputFocus: string;

  activeStatusColor: string;
  inactiveStatusColor: string;

  // Header
  headerBackground: string;
  headerText: string;

  // Upload File Box
  uploadFileHover: string;

}

export const Colors: { light: AppColors; dark: AppColors } = {
  light: {
    primary: "#ED1C25", 
    primaryHover: "#F0484E",       
    secondary: "#0b7077",      
    background: "#ffffff",    
    text: "#1e2329",          
    icon: "#687076",
    tint: tintColorLight,

    // header
    headerBackground: "#0173f5",
    headerText: "#ffffff",

    // Borders & Dividers
    border: "#DEE2E6",  
    
    // Upload File Box
    uploadFileHover: "#e9ecf0",

    // Shadows
    shadow: "rgba(0,0,0,0.1)", 

    // Buttons & Interactive Elements
    buttonBackground: "#0173f5",
    buttonText: "#ffffff",     
    buttonSecondary: "#F1F3F5",   
    buttonSecondaryText: "#0a7ea4", 
    buttonHover: "#68809c", 

    // Input & forms
    inputBackground: "#FFFFFF",
    inputText: "#6a6c6e",
    inputBorder: "#e6e9ed",
    inputFocusBorder: "#0173f5",
    inputLabel: "0173f5", 
    inputPlaceholder: "#898d8f",
    inputHover: "#1976d2",
    inputFocus: "#1976d2",

    // Alerts & Feedback
    success: "#28A745",        
    warning: "#FFC107",         
    error: "#DC3545",           

    tabIconDefault: "#687076", 
    tabIconSelected: "#0a7ea4", 

    // active inactive status
    activeStatusColor: 'green',
    inactiveStatusColor: 'gray',
  },

  // >>>>>>>>>>>>>>>>>>>>>>>>>>DARK THEM>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  
  dark: {
    primary: "#0a7ea4", 
    primaryHover: "#F0484E",        
    secondary: "#0b7077",       
    background: "#151718",      
    text: "#909499",            
    icon: "#3d3d3b",   
    tint: tintColorDark, 
    
    // header
    headerBackground: "#0173f5",
    headerText: "#ffffff",

    // Borders & Dividers
    border: "#d6ced2", 
    
    // Upload File Box
    uploadFileHover: "#e9ecf0",

    // Shadows
    shadow: "#d6ced2",

    // Buttons & Interactive Elements
    buttonBackground: "#62dafb",  
    buttonText: "#151718",       
    buttonSecondary: "#25262B",   
    buttonSecondaryText: "#62dafb", 
    buttonHover: "#1364bf", 

    // Input & Forms
    inputBackground: "#051217",
    inputText: "#d6ced2",
    inputBorder: "#d6ced2",
    inputFocusBorder: "#0173f5",
    inputLabel: "#d6ced2", 
    inputPlaceholder: "#d6ced2",
    inputHover: "#1976d2",
    inputFocus: "#d6ced2",

    // Alerts & Feedback
    success: "#1DB954",        
    warning: "#FFB400",        
    error: "#E63946",       
    
    // active inactive status
    activeStatusColor: 'green',
    inactiveStatusColor: 'gray',

    tabIconDefault: "#9BA1A6", 
    tabIconSelected: "#ffffff", 
  },
};