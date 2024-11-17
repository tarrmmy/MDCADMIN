import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Sort, Inject, Toolbar, Filter, Edit } from '@syncfusion/ej2-react-grids';
import { customersData } from '../data/dummy';

const Customers = () => {
    const filterSettings = { type: 'Excel' };
    const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    const customeridRule = { required: true, minLength: 5 };
    const orderidRules = { required: true, number: true };
    const freightRules = { required: true, min: 0 };
    return (<div className='control-pane'>
      <div className='control-section'>
        <GridComponent dataSource={customersData} height='350' allowSorting={true} editSettings={editSettings} allowFiltering={true} filterSettings={filterSettings} toolbar={toolbar}>
          <ColumnsDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='120' textAlign='Right' validationRules={orderidRules} isPrimaryKey={true}></ColumnDirective>
            <ColumnDirective field='CustomerName' headerText='Customer Name' width='150' validationRules={customeridRule}></ColumnDirective>
            <ColumnDirective field='OrderDate' headerText='Order Date' width='130' format='yMd' textAlign='Right' editType='datepickeredit'/>
            <ColumnDirective field='Freight' headerText='Freight' width='120' format='C2' textAlign='Right' validationRules={freightRules} editType='numericedit'/>
          </ColumnsDirective>
          <Inject services={[Sort, Toolbar, Filter, Edit]}/>
        </GridComponent>
      </div>
    </div>);
}
export default Customers;