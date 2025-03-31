
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectParameter } from '@/types/project';
import { Edit, Trash } from 'lucide-react';

interface ParameterTableRowProps {
  parameter: ProjectParameter;
  onEdit: (parameter: ProjectParameter) => void;
  onDelete?: (parameter: ProjectParameter) => void;
}

const ParameterTableRow: React.FC<ParameterTableRowProps> = ({ 
  parameter,
  onEdit,
  onDelete
}) => {
  const getCategoryColor = (category: ProjectParameter['category']) => {
    switch (category) {
      case 'financial':
        return 'bg-cardano-500 text-white';
      case 'operational':
        return 'bg-nature-500 text-white';
      case 'technical':
        return 'bg-taino-500 text-earth-900';
      case 'agricultural':
        return 'bg-vanilla-600 text-white';
      case 'governance':
        return 'bg-vanilla-800 text-white';
      default:
        return 'bg-vanilla-300 text-earth-900';
    }
  };

  return (
    <TableRow className="hover:bg-earth-600/30 border-earth-600">
      <TableCell className="font-medium text-vanilla-100">
        <div>
          {parameter.name}
          <p className="text-xs text-vanilla-300 mt-1">{parameter.description}</p>
        </div>
      </TableCell>
      <TableCell className="font-bold text-cardano-400">{parameter.value}</TableCell>
      <TableCell>
        <Badge className={getCategoryColor(parameter.category)}>
          {parameter.category.charAt(0).toUpperCase() + parameter.category.slice(1)}
        </Badge>
      </TableCell>
      <TableCell className="text-vanilla-300">{parameter.lastUpdated}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-vanilla-200 hover:text-vanilla-50 hover:bg-earth-600"
            onClick={() => onEdit(parameter)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          {onDelete && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-vanilla-200 hover:text-vanilla-50 hover:bg-earth-600"
              onClick={() => onDelete(parameter)}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ParameterTableRow;
