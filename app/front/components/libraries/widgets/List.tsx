import * as React from 'react'

import { Card, List } from 'antd'
import { Link } from 'react-router-dom'

import Icon, { IconType } from 'components/common/Icon'
import Loader from 'components/common/Loader'
import Library from 'model/Library'

import Container from './ListContainer'

export interface Props {
    libs: Library[]
}

export class ListComponent extends React.PureComponent<Props, {}> {
    public render() {
        const { libs } = this.props

        return (
            <Card
                title={'Разделы'}
                actions={[
                    <Link to={'/libs/form'}>Добавить</Link>,
                ]}
            >
                { (libs.length > 0)
                    ? this.renderLibs(libs)
                    : <p>В библиотеке нет разделов</p>
                }
            </Card>
        )
    }

    public renderLibs = (libs: Library[]) =>
        <List
            size={'large'}
            dataSource={libs}
            renderItem={(l: Library) =>
                <List.Item actions={[
                    <Link to={`/libs/show/${l.id}`}><Icon type={IconType.EYE_O} /></Link>,
                ]}>
                    <List.Item.Meta title={l.title} />
                </List.Item>
            }
        />
}

export default Container(ListComponent)
