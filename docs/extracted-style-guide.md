# Extracted Style Guide from Old Contact Page

## 🎨 Color Palette

### Brand Colors
```css
brand: {
  50: '#f0fdfa',    /* Very light teal background */
  100: '#ccfbf1',   /* Light teal background */
  200: '#99f6e4',   /* Light teal */
  300: '#5eead4',   /* Medium-light teal */
  400: '#2dd4bf',   /* Medium teal */
  500: '#14b8a6',   /* Primary brand color */
  600: '#0d9488',   /* Medium-dark teal */
  700: '#0f766e',   /* Dark teal */
  800: '#115e59',   /* Very dark teal */
  900: '#134e4a',   /* Darkest teal */
  950: '#042f2e',   /* Almost black teal */
}
```

### Semantic Colors
```css
/* Backgrounds */
- Page background: gradient-to-br from-gray-50 to-gray-100
- Card background: white
- Muted background: gray-50
- Success background: green-50
- Info background: blue-50

/* Text Colors */
- Primary text: gray-900
- Secondary text: gray-600
- Muted text: gray-500
- Link text: brand-600
- Success text: green-700
- Info text: blue-700

/* Border Colors */
- Default border: gray-100
- Input border: gray-200
- Focus border: brand-500
```

## 📝 Typography

### Font Sizes and Weights
```css
/* Headers */
h1: text-5xl font-bold          /* 48px, bold */
h2: text-3xl font-bold          /* 30px, bold */
h3: text-lg font-medium         /* 18px, medium */

/* Body Text */
Paragraph: text-xl leading-relaxed    /* 20px, relaxed line-height */
Description: text-gray-600            /* Medium gray */
Small text: text-sm                   /* 14px */
Extra small: text-xs                  /* 12px */

/* Form Elements */
Labels: text-sm font-semibold         /* 14px, semibold */
Input text: text-gray-900             /* Dark gray */
Placeholder: placeholder text         /* Light gray */

/* Buttons */
Button text: font-bold text-lg        /* Bold, 18px */
```

## 📐 Spacing System

### Container and Layout
```css
/* Page Container */
max-width: max-w-7xl (1280px)
padding: px-4 sm:px-6 lg:px-8

/* Vertical Spacing */
Section spacing: py-16 (64px top/bottom)
Header margin: mb-16 (64px bottom)
Card spacing: space-y-12 (48px between elements)
Form spacing: space-y-6 (24px between fields)
Content spacing: space-y-8 (32px between content blocks)

/* Grid Gaps */
Main grid: gap-8 (32px)
Form grid: gap-6 (24px)
```

### Card Design
```css
/* Card Container */
Background: bg-white
Border radius: rounded-2xl (16px)
Padding: p-10 (40px all sides)
Shadow: shadow-2xl
Border: border border-gray-100
Hover: hover:shadow-3xl transition-all duration-300

/* Card Headers */
Text alignment: text-center
Padding bottom: pb-6 (24px)
Border bottom: border-b border-gray-100
```

## 🎯 Component Styling

### Buttons

#### Primary Button (Gradient)
```css
/* Base Styles */
background: bg-gradient-to-r from-brand-500 to-brand-600
color: text-white
padding: py-5 px-6 (20px vertical, 24px horizontal)
border-radius: rounded-xl (12px)
font: font-bold text-lg
shadow: shadow-lg

/* Hover States */
hover:from-brand-600 hover:to-brand-700
hover:shadow-xl
transform: hover:-translate-y-0.5
transition: transition-all duration-200

/* Disabled State */
disabled:opacity-50
disabled:cursor-not-allowed
```

#### Secondary Button
```css
background: bg-brand-500
color: text-white
padding: px-6 py-3
border-radius: rounded-lg
font: font-semibold
hover: hover:bg-brand-600
transition: transition-colors
```

### Form Elements

#### Input Fields
```css
/* Base Styles */
width: w-full
padding: px-4 py-4 (16px horizontal, 16px vertical)
border: border-2 border-gray-200
border-radius: rounded-xl (12px)
color: text-gray-900

/* Focus States */
focus:ring-2 focus:ring-brand-500
focus:border-brand-500
transition: transition-all duration-200

/* Label Styles */
label: text-sm font-semibold text-gray-700 mb-2
```

#### Textarea
```css
/* Same as input plus */
rows: 6
resize: resize-none (implied)
```

### Icon Containers

#### Icon Boxes (Brand)
```css
/* Container */
size: w-14 h-14 (56px x 56px)
background: bg-gradient-to-br from-brand-500 to-brand-600
border-radius: rounded-xl (12px)
display: flex items-center justify-center
shadow: shadow-lg

/* Icon */
size: w-6 h-6 (24px x 24px)
color: text-white
fill: fill="currentColor"
```

### Status Badges

#### Success Badge
```css
background: bg-green-50
color: text-green-700
padding: px-3 py-1
font: text-xs font-medium
border-radius: rounded-lg
display: inline-flex items-center gap-2
```

#### Info Badge
```css
background: bg-blue-50
color: text-blue-700
padding: px-3 py-1
font: text-xs font-medium
border-radius: rounded-lg
display: inline-flex items-center gap-2

/* Animated dot */
w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse
```

### Special Effects

#### Loading Spinner
```css
/* Container */
animate-spin
border-radius: rounded-full
size: h-6 w-6
border: border-b-2 border-white
```

#### Success Checkmark
```css
size: w-16 h-16
color: text-green-600
margin: mx-auto mb-4
```

## 🗂️ Layout Patterns

### Two-Column Grid
```css
grid: lg:grid-cols-2
gap: gap-8
```

### Form Grid (Responsive)
```css
grid: md:grid-cols-2
gap: gap-6
```

### Business Hours List
```css
/* Container */
background: bg-gray-50
border-radius: rounded-lg
padding: p-4
spacing: space-y-2

/* Items */
display: flex justify-between items-center
text: text-sm
label: text-gray-600
value: text-gray-800 font-medium
```

## 🎭 Interactive States

### Hover Effects
```css
/* Cards */
hover:shadow-3xl transition-all duration-300

/* Buttons */
hover:shadow-xl
transform: hover:-translate-y-0.5
transition: transition-all duration-200

/* Links */
hover:text-brand-700 transition-colors
```

### Focus States
```css
/* Form inputs */
focus:ring-2 focus:ring-brand-500
focus:border-brand-500
transition: transition-all duration-200
```

### Loading States
```css
/* Button loading */
disabled:opacity-50
disabled:cursor-not-allowed

/* Spinner animation */
animate-spin rounded-full border-b-2
```

## 🌐 Responsive Design

### Breakpoints
```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

### Responsive Patterns
```css
/* Grid responsive */
grid-cols-1 md:grid-cols-2 lg:grid-cols-2

/* Padding responsive */
px-4 sm:px-6 lg:px-8

/* Text responsive */
text-3xl md:text-4xl lg:text-5xl
```

This style guide captures the premium, modern aesthetic of the original contact page with clean cards, gradients, and professional spacing.