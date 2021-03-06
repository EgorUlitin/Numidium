import * as React from 'react'

import { Card, Col, List, Row } from 'antd'
import { Link } from 'react-router-dom'

import Breadcrumbs from 'components/common/Breadcrumbs'
import Icon, { IconType } from 'components/common/Icon'
import Article from 'model/Article'
import Book from 'model/Book'
import Library from 'model/Library'

import Container from './LibraryContainer'

export interface Props {
    library: Library

    openArticle: (id: number) => void
    editArticle: (lib: Library, id?: number) => void

    openBook: (id: number) => void
    editBook: (lib: Library, id?: number) => void
}

export class LibraryComponent extends React.PureComponent<Props, {}> {

    public render() {
        const { library } = this.props

        return (
            <React.Fragment>
                <Breadcrumbs breadcrumbs={[ 'Библиотека', 'Раздел' ]} />

                <Row gutter={16}>

                    <Col lg={24}>
                        <Card
                            title={library.title}
                            actions={[
                                <Link to={`/libs/form/${library.id}`}>Редактировать раздел</Link>,
                                <span onClick={() => this.props.editBook(library)}>Добавить книгу</span>,
                                <span onClick={() => this.props.editArticle(library)}>Добавить статью</span>,
                            ]}
                        >
                            <p>{library.description}</p>
                        </Card>
                    </Col>

                    <Col lg={12} md={24}>
                        <Card title="Книги">
                            { (library.books.length > 0)
                                ? this.renderBooks(library.books)
                                : <p>В разделе нет книг</p>
                            }
                        </Card>
                    </Col>

                    <Col lg={12} md={24}>
                        <Card title="Статьи">
                            { (library.articles.length > 0)
                                ? this.renderArticles(library.articles)
                                : <p>В разделе нет статей</p>
                            }
                        </Card>
                    </Col>

                </Row>
            </React.Fragment>
        )
    }

    public renderArticles = (articles: Article[]) =>
        <List
            size={'large'}
            dataSource={articles}
            renderItem={(article: Article) =>
                <List.Item actions={[
                    <Icon type={IconType.EYE_O} onClick={
                        () => this.props.openArticle(article.id)
                    } />,
                    <Icon type={IconType.EDIT} onClick={
                        () => this.props.editArticle(this.props.library, article.id)
                    } />,
                ]}>
                    <List.Item.Meta title={article.title} description={`${article.author} | ${article.year}`} />
                </List.Item>
            }
        />

    public renderBooks = (books: Book[]) =>
        <List
            size={'large'}
            dataSource={books}
            renderItem={(book: Book) =>
                <List.Item actions={[
                    <Icon type={IconType.EYE_O} onClick={
                        () => this.props.openBook(book.id)
                    } />,
                    <Icon type={IconType.EDIT} onClick={
                        () => this.props.editBook(this.props.library, book.id)
                    }/>,
                ]}>
                    <List.Item.Meta title={book.title} description={`${book.author} | ${book.year}`} />
                </List.Item>
            }
        />
}

export default Container(LibraryComponent)
