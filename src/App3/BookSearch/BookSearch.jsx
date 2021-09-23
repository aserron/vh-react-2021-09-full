import React from "react";

class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        const fields = [
            "author", "title", "country", "language", "year"
        ];
        this.state   = {
            fields: fields.reduce((a, e) => {
                a[e] = "";
                return a;
            }, {})
        };
        
        // moving to binded handler.
        this.handleChange = this.handleChange.bind(this);
    }
    
    /**
     * Test if the search fields values matches the with book entries (field to field)
     * @param book
     * @return {this is [string, unknown][]}
     *
     * @internal Fixed match method, changing from some to EVERY
     */
    matchesBook(book) {
        const {fields} = this.state;
        let res        = Object.entries(book).every(([k, v]) => {
            return !fields[k] || v.toString()
                                    .toLowerCase()
                                    .includes(fields[k].trim().toLowerCase());
        })
        return res;
    }
    
    /**
     * fix: use standart event with dataset property.
     * fix: use currentTarget to get input value.
     * @param {SyntheticEvent} evt
     */
    handleChange(evt) {
        
        let name  = evt.currentTarget.dataset.field;
        let value = evt.target.value;
        
        this.setState(state => ({
            ...state,
            fields: {
                ...state.fields,
                [name]: value
            }
        }));
    }
    
    /**
     * Added binded onChange handler and dataset property
     * @return {JSX.Element}
     */
    render() {
        
        return (
            
            <div className="book-search-container">
                
                <div className="search-box">
                    
                    {Object.keys(this.state.fields).map(e =>
                        <label key={e}>
                            {e}
                            <input
                                autoComplete="off"
                                value={this.state.fields[e]}
                                className={e}
                                onChange={this.handleChange}
                                data-field={e}
                            />
                        </label>
                    )}
                </div>
                
                <div className="books">
                    {this.props.books
                        .filter(e => this.matchesBook(e))
                        .map((e, i) => {
                            return (<div key={e.title + i} className="book">
                                {Object.entries(e).map(([k, v]) =>
                                    <div key={k} className="book-detail-row">
                                        <span className="book-detail-key">{k}</span>
                                        <span className="book-detail-val">{v}</span>
                                    </div>
                                )}
                            </div>)
                        })
                    }
                </div>
            </div>
        );
    }
}

export default BookSearch;
