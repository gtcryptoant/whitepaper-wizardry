
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProjectParameter } from '@/types/project';
import ParameterTableRow from './ParameterTableRow';

interface ParameterTableProps {
  parameters: ProjectParameter[];
  onEditParameter: (parameter: ProjectParameter) => void;
  onDeleteParameter?: (parameter: ProjectParameter) => void;
}

const ParameterTable: React.FC<ParameterTableProps> = ({ 
  parameters,
  onEditParameter,
  onDeleteParameter
}) => {
  return (
    <div className="rounded-md border border-earth-600 overflow-hidden">
      <Table>
        <TableHeader className="bg-earth-600">
          <TableRow className="hover:bg-earth-600/80">
            <TableHead className="text-vanilla-100 font-semibold">Name</TableHead>
            <TableHead className="text-vanilla-100 font-semibold">Value</TableHead>
            <TableHead className="text-vanilla-100 font-semibold">Category</TableHead>
            <TableHead className="text-vanilla-100 font-semibold">Last Updated</TableHead>
            <TableHead className="text-vanilla-100 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-earth-700/50">
          {parameters.map((parameter) => (
            <ParameterTableRow 
              key={parameter.id} 
              parameter={parameter} 
              onEdit={onEditParameter}
              onDelete={onDeleteParameter}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParameterTable;
