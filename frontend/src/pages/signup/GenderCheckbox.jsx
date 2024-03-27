import React, { useState } from 'react';

const GenderCheckbox = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className='flex'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Male</span>
          <input
            type='radio'
            className='checkbox border-slate-900'
            name='gender'
            checked={selectedGender === 'male'}
            onChange={() => handleGenderChange('male')}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Female</span>
          <input
            type='radio'
            className='checkbox border-slate-900'
            name='gender'
            checked={selectedGender === 'female'}
            onChange={() => handleGenderChange('female')}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
