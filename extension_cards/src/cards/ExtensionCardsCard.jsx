import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import {
    Typography,
    Search,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Button
} from '@ellucian/react-design-system/core';
import { useCardControl } from "@ellucian/experience-extension-utils";
import debounce from "lodash";

const styles = () => ({
    card: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: spacing40
    }
});

const ExtensionCardsCard = (props) => {
    const {
        classes,
        cardInfo: { cardId }
    } = props;

    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('bannerId');
    // const { authenticatedEthosFetch } = useData();
    const { navigateToPage } = useCardControl();

    console.log('card id:', cardId);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        console.log(event.target.value, "search value");
        debounceFunction(event.target.value)
    };

    const debounceFunction = (value)=> {
        console.log("inside debounce")
        debounce((value) => {
            console.log(value,": searchvalue from debounce");
    }, 500);
    }


    // useEffect(() => {
    //     console.log(searchValue,": searchvalue");

    // },[searchValue])

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            console.log('Search submitted:', searchValue);
            console.log('Search type:', searchType);
        }
    };

    const handleViewDetails = (event) => {
        console.log(event);
        navigateToPage({ route: '/ViewDetails' });
    };


    // useEffect(() => {
    //     let isMounted = true;

    //     const fetchData = async () => {
    //         if (!isMounted) return;

    //         try {
    //             const queryParams = new URLSearchParams();
    //             queryParams.append('cardId', cardId);
    //             queryParams.append('id', searchValue);
    //             queryParams.append('apiKey', "4e3f85f4-e8ad-4e76-b54b-8eb22843aa06");
    //             queryParams.append('typeFlag', searchType === 'bannerId' ? "true" : "false");

    //             const resource = `test-sample---1?${queryParams.toString()}`;
    //             console.log("Full resource URL:", resource);

    //             const options = {
    //                 method: 'GET',
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //             };

    //             const response = await authenticatedEthosFetch(resource, options);

    //             if (!response.ok) {
    //                 const errorText = await response.text();
    //                 console.error("fetch API Error:", errorText);
    //                 throw new Error(`HTTP ${response.status}: ${response.statusText || errorText}`);
    //             }

    //             const data = await response.json();
    //             console.log("fetch API response:", data);

    //             if (data.errors && data.errors.length > 0) {
    //                 console.error("API returned errors:", data.errors);
    //                 throw new Error(data.errors[0].description || data.errors[0].details || "API error");
    //             }

    //             let fetchedData = null;

    //             console.log("Extracted data:", fetchedData);

    //         } catch (err) {
    //             console.error("Failed to fetch data:", err.message);
    //             console.error("Full error:", err);
    //         }
    //     };

    //     fetchData();

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [cardId, authenticatedEthosFetch, searchValue, searchType]);


    return (
        <div className={classes.card}>
            <Typography variant="h2" gutterBottom>
                Sample Extension Card
            </Typography>

            <FormControl>
                <FormLabel id="search-type-radio-group">Search By</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="search-type-radio-group"
                    name="search-type-radio-group"
                    value={searchType}
                    onChange={handleSearchTypeChange}
                >
                    <FormControlLabel value="bannerId" control={<Radio />} label="Banner ID" />
                    <FormControlLabel value="lastName" control={<Radio />} label="Last Name" />
                </RadioGroup>
            </FormControl>

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
            
            <div className={classes.buttonContainer}>
                <Button
                    color="primary"
                    size="default"
                    variant="contained"
                    onClick={handleViewDetails}
                >
                    View Details
                </Button>
            </div>
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