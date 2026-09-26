// src/features/deliveries/components/DeliveryForm.jsx
// Used by both DeliveryCreatePage and (in read/edit mode) DeliveryDetailPage.
import { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import DeliveryLineRow from './DeliveryLineRow';

const emptyLine = () => ({
  productId: '',
  locationId: '',
  quantity: 1,
  availableAtLocation: 0,
});

/**
 * @param {object} initialValues - { deliveryAddress, scheduleDate, responsible, operationType, lines }
 * @param {Array}  productOptions  - [{ value, label }]
 * @param {Array}  locationOptions - [{ value, label }]
 * @param {function} onSubmit - (payload) => void
 * @param {boolean}  submitting
 */
export default function DeliveryForm({
  initialValues,
  productOptions = [],
  locationOptions = [],
  onSubmit,
  submitting = false,
}) {
  const [values, setValues] = useState(
    initialValues || {
      deliveryAddress: '',
      scheduleDate: '',
      responsible: '',
      operationType: 'outgoing',
      lines: [emptyLine()],
    }
  );

  const setField = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const updateLine = (index, nextLine) => {
    setValues((v) => {
      const lines = [...v.lines];
      lines[index] = nextLine;
      return { ...v, lines };
    });
  };

  const addLine = () => setValues((v) => ({ ...v, lines: [...v.lines, emptyLine()] }));

  const removeLine = (index) => {
    setValues((v) => ({ ...v, lines: v.lines.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-border bg-surface p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Delivery address"
          name="deliveryAddress"
          value={values.deliveryAddress}
          onChange={setField('deliveryAddress')}
          placeholder="Customer / drop-off address"
          required
        />
        <Input
          label="Schedule date"
          name="scheduleDate"
          type="date"
          value={values.scheduleDate}
          onChange={setField('scheduleDate')}
          required
        />
        <Input
          label="Responsible"
          name="responsible"
          value={values.responsible}
          onChange={setField('responsible')}
          placeholder="Assigned staff member"
        />
        <Select
          label="Operation type"
          name="operationType"
          value={values.operationType}
          onChange={setField('operationType')}
          options={[{ value: 'outgoing', label: 'Outgoing — Customer Shipment' }]}
        />
      </div>

      <h3 className="mt-8 mb-3 border-t border-border pt-5 text-xs font-semibold text-ink-soft">
        Products
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[10.5px] font-semibold text-ink-soft">
            <th className="pb-2">Product</th>
            <th className="pb-2">Location</th>
            <th className="pb-2">Quantity</th>
            <th className="pb-2" />
          </tr>
        </thead>
        <tbody>
          {values.lines.map((line, i) => (
            <DeliveryLineRow
              key={i}
              line={line}
              productOptions={productOptions}
              locationOptions={locationOptions}
              onChange={(next) => updateLine(i, next)}
              onRemove={() => removeLine(i)}
            />
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={addLine}
        className="mt-3 text-xs font-semibold text-ink hover:text-accent"
      >
        + Add product
      </button>

      <div className="mt-8 flex justify-end gap-2">
        <Button type="submit" variant="accent" loading={submitting}>
          Save as Draft
        </Button>
      </div>
    </form>
  );
}
