import React from 'react'
import "./FilterSideBar.css"

class FilterSideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <aside className="filter-aside">
                <label htmlFor="category-picker">
                    Category:
                    <select id="category-picker">
                        <option value="">All</option>
                        <option value="">Foo</option>
                        <option value="">Bar</option>
                    </select>
                </label>
                

                <label htmlFor="price-range">
                    Price:
                    <input type="range" id="price-range" />
                </label>

                <label htmlFor="sort-by">
                    Sort By:
                    <select id="sort-by">
                        <option value="">Relevance</option>
                        <option value="">Rating</option>
                        <option value="">Foo</option>
                    </select>
                </label>
                

            </aside>
        );
    }
}

export default FilterSideBar