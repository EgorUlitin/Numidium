import * as React from 'react'

import { Modal } from 'antd'
import { Form } from 'react-final-form'

import Checkbox from 'components/common/form/Checkbox'
import FormWrapper from 'components/common/form/FormWrapper'
import ItemWrapper from 'components/common/form/ItemWrapper'
import NumberInput from 'components/common/form/NumberInput'
import TextArea from 'components/common/form/TextArea'
import TextInput from 'components/common/form/TextInput'
import Loader from 'components/common/Loader'
import Book from 'model/Book'

import Container from './FormModalConatiner'

export interface FormFields {
    title: string
    author: string
    year: number
    description: string
    paper: boolean
    shopLink: string
    externalFileLink: string
}

export interface Props {
    loading: boolean
    error: boolean
    visible: boolean

    book?: Book

    hide: () => void
    submit: (values: FormFields) => void
    validate: (values: FormFields) => any
}

class ModalForm extends React.PureComponent<Props, {}> {
    public render() {
        const { loading, error, book, visible, hide, submit, validate } = this.props

        const initialValues = !!book
            ? this.initialBook(book)
            : this.initialEmpty()

        return <Form
            onSubmit={(values) => submit(values as FormFields)}
            validate={(values) => validate(values as FormFields)}
            initialValues={initialValues}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <Modal
                    wrapClassName="vertical-center-modal"
                    title={'Книга'}
                    visible={visible}

                    okText={'Сохранить'}
                    cancelText={'Отменить'}

                    onOk={() => handleSubmit()}
                    onCancel={() => {
                        reset()
                        hide()
                    }}
                >
                    <Loader loading={loading} error={error}>
                        <FormWrapper>

                            <ItemWrapper tail label="Название">
                                <TextInput name="title" placeholder="Чистый код" />
                            </ItemWrapper>

                            <ItemWrapper tail label="Автор">
                                <TextInput name="author" placeholder="Роберт Мартин" />
                            </ItemWrapper>

                            <ItemWrapper tail label="Год выхода">
                                <NumberInput name="year" />
                            </ItemWrapper>

                            <ItemWrapper label="Описание" tail>
                                <TextArea
                                    name="description"
                                    placeholder="Даже плохой программный код может работать."
                                    rows={5}
                                />
                            </ItemWrapper>

                            <ItemWrapper tail label="Ссылка на покупку">
                                <TextInput name="shopLink" />
                            </ItemWrapper>

                            <ItemWrapper tail label="Ссылка на файл">
                                <TextInput name="externalFileLink" />
                            </ItemWrapper>

                            <ItemWrapper>
                                <Checkbox name="paper" label="Есть бумажный экземпляр" />
                            </ItemWrapper>

                        </FormWrapper>
                    </Loader>
                </Modal>
            )}
        />
    }

    public initialBook = (book: Book) => ({
        title: book.title,
        author: book.author,
        year: book.year,
        description: book.description,
        paper: book.paper,
        shopLink: book.shopLink,
        externalFileLink: book.externalFileLink,
    } as FormFields)

    public initialEmpty = () => ({
        title: '',
        author: '',
        year: (new Date()).getFullYear(),
        description: '',
        paper: false,
        shopLink: '',
        externalFileLink: '',
    } as FormFields)
}

export default Container(ModalForm)
