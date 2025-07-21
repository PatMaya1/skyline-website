import { 
  Globe,
  Smartphone,
  Shield,
  BarChart3,
  Cog,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Mapeo de iconos por nombre de string
export const iconMap = {
  Globe,
  Smartphone,
  Shield,
  BarChart3,
  Cog,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
};

// Función helper para obtener el componente de icono
export const getIcon = (iconName, props = {}) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};
