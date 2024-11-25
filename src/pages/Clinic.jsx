import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { customersData } from '../data/dummy';

const Clinic = () => {
  const filterSettings = { type: 'Excel' };
  const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const customeridRule = { required: true };
  const orderidRules = { required: true, number: true };
  
  return (<div className='control-pane'>
    <div className='control-section'>
      <GridComponent dataSource={customersData} height='350' allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
        <ColumnsDirective>
          <ColumnDirective field='FirstName' headerText='First Name' width='120' textAlign='Right' validationRules={orderidRules} ></ColumnDirective>
          <ColumnDirective field='LastName' headerText='Last Name' width='150' validationRules={customeridRule}></ColumnDirective>
          <ColumnDirective field='Diagnosis' headerText='Diagnosis' width='150' validationRules={customeridRule}></ColumnDirective>
          <ColumnDirective field='Prescription' headerText='Prescription' width='150' validationRules={customeridRule}></ColumnDirective>
          <ColumnDirective field='Doctor' headerText='Doctor' width='150' validationRules={customeridRule}></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Sort, Toolbar, Filter, Edit]}/>
      </GridComponent>
    </div>
  </div>);
}
export default Clinic;