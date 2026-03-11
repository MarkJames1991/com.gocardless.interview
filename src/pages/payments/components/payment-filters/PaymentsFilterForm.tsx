import { Button as AntButton, Form, Radio, Space, type FormProps } from 'antd'

export type PaymentsFilterValues = {
  dateType: 'created' | 'charge'
  timeRange: 'anytime' | 'today' | 'yesterday' | 'this-week' | 'this-month'
}

type PaymentsFilterFormProps = {
  onClose: () => void
  onChange?: (values: PaymentsFilterValues) => void
  onClear?: () => void
  onSubmit?: FormProps<PaymentsFilterValues>['onFinish']
}

const initialValues: PaymentsFilterValues = {
  dateType: 'created',
  timeRange: 'anytime',
}

export function PaymentsFilterForm({ onClose, onChange, onClear, onSubmit }: PaymentsFilterFormProps) {
  const [form] = Form.useForm<PaymentsFilterValues>()

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="vertical"
      onFinish={(values) => {
        onSubmit?.(values)
        onClose()
      }}
      onValuesChange={() => {
        onChange?.(form.getFieldsValue())
      }}
    >
      <Form.Item label="Date" name="dateType">
        <Radio.Group className="flex flex-col gap-4">
          <Radio value="created">Created date</Radio>
          <Radio value="charge">Charge date</Radio>
        </Radio.Group>
      </Form.Item>

      <div className="my-8 border-t border-[#d4cec5]" />

      <Form.Item name="timeRange">
        <Radio.Group className="flex flex-col gap-4">
          <Radio value="anytime">Anytime</Radio>
          <Radio value="today">Today</Radio>
          <Radio value="yesterday">Yesterday</Radio>
          <Radio value="this-week">This week</Radio>
          <Radio value="this-month">This month</Radio>
        </Radio.Group>
      </Form.Item>

      <div className="mt-10 border-t border-[#d4cec5] pt-8">
        <Space size={14}>
          <AntButton
            className="!h-11 !rounded-full !bg-[#171410] !px-7 !text-[1.05rem] !font-semibold !text-white hover:!bg-black"
            htmlType="submit"
            type="primary"
          >
            Show results
          </AntButton>
          <AntButton
            className="!h-11 !rounded-full !border-[#d4cec5] !px-5 !text-[1.05rem] !font-semibold !text-[#262320]"
            type="default"
            onClick={() => {
              form.resetFields()
              onClear?.()
              onChange?.(form.getFieldsValue())
            }}
          >
            Clear filters
          </AntButton>
        </Space>
      </div>
    </Form>
  )
}
