import React, { useState } from 'react';

interface FormProps {
  addTask: (title: string, description?: string) => void;
}

export default function Form({ addTask }: FormProps) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title) {
      addTask(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter task title" />
      <input type="text" value={description} onChange={handleDescriptionChange} placeholder="Enter task description" />
      <button type="submit">Add Task</button>
    </form>
  );
}
