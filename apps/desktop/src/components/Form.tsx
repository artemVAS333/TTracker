import React, { useState } from 'react';

interface FormProps {
  addTimer: (title: string, description?: string) => void;
}

export default function Form({ addTimer }: FormProps) {
  const [title, setTitle] = useState<string>('');
  const [descripetion, setDescripetion] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => setDescripetion(event.target.value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title) {
      addTimer(title, descripetion);
      setTitle('');
      setDescripetion('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={handleTitleChange} placeholder="Enter timer title" />
      <input
        type="text"
        value={descripetion}
        onChange={handleDescriptionChange}
        placeholder="Enter timer description"
      />
      <button type="submit">Add Timer</button>
    </form>
  );
}
