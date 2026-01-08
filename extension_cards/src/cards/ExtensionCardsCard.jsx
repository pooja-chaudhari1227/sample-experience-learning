import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography, Search } from '@ellucian/react-design-system/core';
import { useData } from "@ellucian/experience-extension-utils";

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});

const ExtensionCardsCard = (props) => {
    const {
        classes,
        cardInfo: { cardId }
    } = props;

    const [searchValue, setSearchValue] = useState('');
    const { authenticatedEthosFetch } = useData();

    console.log('card id:', cardId);
    // console.log('value:',searchValue);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            console.log('Search submitted:', searchValue);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (!isMounted) return;

            try {
                const queryParams = new URLSearchParams();
                queryParams.append('cardId', cardId);
                queryParams.append('id', searchValue);
                queryParams.append('apiKey', "4e3f85f4-e8ad-4e76-b54b-8eb22843aa06");
                queryParams.append('typeFlag',"false");

                const resource = `test-sample---1?${queryParams.toString()}`;
                console.log("Full resource URL:", resource);

                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                };

                const response = await authenticatedEthosFetch(resource, options);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("fetch API Error:", errorText);
                    throw new Error(`HTTP ${response.status}: ${response.statusText || errorText}`);
                }

                const data = await response.json();
                console.log("fetch API response:", data);

                if (data.errors && data.errors.length > 0) {
                    console.error("API returned errors:", data.errors);
                    throw new Error(data.errors[0].description || data.errors[0].details || "API error");
                }

                let fetchedData = null;

                // Handle different response structures
                // if (typeof data === 'string') {
                //     fetchedData = data;
                // } else if (data.lastName) {
                //     fetchedData = data.lastName;
                // } else if (data.data) {
                //     fetchedData = data.data.lastName || data.data;
                // } else if (data.payload) {
                //     fetchedData = data.payload.lastName || data.payload;
                // } else if (data.message) {
                //     fetchedData = data.message.lastName || data.message;
                // }

                console.log("Extracted data:", fetchedData);

            } catch (err) {
                console.error("Failed to fetch data:", err.message);
                console.error("Full error:", err);
            }
        };


        fetchData();

        return () => {
            isMounted = false;
        };
    }, [cardId, authenticatedEthosFetch, searchValue]);

    return (
        <div className={classes.card}>
            <Typography variant="h2" gutterBottom>
                Sample Extension Card
            </Typography>

            <Typography gutterBottom>
                Press enter to submit.
            </Typography>

            <Search
                inputProps={{ 'aria-label': 'Search for an item' }}
                id="search-example"
                name="search"
                placeholder="Standard Search"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
            />
        </div>
    );
};

ExtensionCardsCard.propTypes = {
    classes: PropTypes.object.isRequired,
    cardInfo: PropTypes.shape({
        cardId: PropTypes.string.isRequired
    }).isRequired
};

export default withStyles(styles)(ExtensionCardsCard);