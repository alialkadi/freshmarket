export interface Categories {
    
        results:  number;
        metadata: Metadata;
        data:     Categories;
    }
    
    export interface Categories {
        _id:       string;
        name:      string;
        slug:      string;
        image:     string;
        createdAt: Date;
        updatedAt: Date;
    }
    
    export interface Metadata {
        currentPage:   number;
        numberOfPages: number;
        limit:         number;
    }
    
