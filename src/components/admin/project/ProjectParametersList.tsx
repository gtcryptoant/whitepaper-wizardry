
import React, { useState } from 'react';
import { ProjectParameter } from '@/types/project';
import ParameterTable from './parameters/ParameterTable';
import ParameterEditDialog from './parameters/ParameterEditDialog';

interface ProjectParametersListProps {
  parameters: ProjectParameter[];
  onUpdate: (parameter: ProjectParameter) => void;
}

const ProjectParametersList: React.FC<ProjectParametersListProps> = ({ 
  parameters,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingParameter, setEditingParameter] = useState<ProjectParameter | null>(null);

  const handleEditStart = (parameter: ProjectParameter) => {
    setEditingParameter({...parameter});
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (editingParameter) {
      // Update the lastUpdated field
      const updatedParameter = {
        ...editingParameter,
        lastUpdated: new Date().toISOString()
      };
      onUpdate(updatedParameter);
      setIsEditing(false);
      setEditingParameter(null);
    }
  };

  const handleInputChange = (field: keyof ProjectParameter, value: string) => {
    if (editingParameter) {
      setEditingParameter({
        ...editingParameter,
        [field]: value
      });
    }
  };

  return (
    <>
      <ParameterTable 
        parameters={parameters} 
        onEditParameter={handleEditStart} 
      />

      <ParameterEditDialog 
        isOpen={isEditing}
        onOpenChange={setIsEditing}
        parameter={editingParameter}
        onParameterChange={handleInputChange}
        onSave={handleEditSave}
      />
    </>
  );
};

export default ProjectParametersList;
