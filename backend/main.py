import requests
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Dummy function - Replace with your real ML model
def get_recommendations(book_title: str):
    import pandas as pd
    import numpy as np
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import mean_squared_error
    from sklearn.neighbors import KNeighborsRegressor
    from sklearn.tree import DecisionTreeRegressor
    from sklearn.linear_model import LinearRegression
    from sklearn.preprocessing import LabelEncoder
    from sklearn.neighbors import NearestNeighbors


    import os, sys
    import re


    df_books = pd.read_csv("D:/ML 3rd Year/Book Recommender/Books.csv/Books.csv")
    df_books.head()

    df_books.columns

    # remove unwanted columns 
    df_books = df_books[['ISBN', 'Book-Title', 'Book-Author']]
    df_books.shape


    df_ratings = pd.read_csv("D:/ML 3rd Year/Book Recommender/Ratings.csv/Ratings.csv")
    df_ratings.head()
    df_ratings.shape


    df_books.isnull().sum()

    df_ratings.isnull().sum()

    df_books.dropna(inplace=True)

    df_books.isnull().sum()

    df_books.shape

    df_ratings.shape

    # Calculate the count of ratings given by each user and store it in the 'ratings' Series
    ratings = df_ratings['User-ID'].value_counts()
    # Sort the 'ratings' Series in descending order based on the counts of user IDs
    ratings.sort_values(ascending=False).head()

    len(ratings[ratings < 200])

    df_ratings['User-ID'].isin(ratings[ratings < 200].index).sum()

    df_ratings_rm = df_ratings[
    ~df_ratings['User-ID'].isin(ratings[ratings < 200].index)
    ]
    df_ratings_rm.shape

    ratings = df_ratings['ISBN'].value_counts() 
    ratings.sort_values(ascending=False).head()

    len(ratings[ratings < 100])

    df_books['ISBN'].isin(ratings[ratings < 100].index).sum()

    df_ratings_rm = df_ratings_rm[
    ~df_ratings_rm['ISBN'].isin(ratings[ratings < 100].index)
    ]
    df_ratings_rm.shape

    df_ratings_rm.head()

    df_books.head()

    df = df_ratings_rm.pivot_table(index=['User-ID'],columns=['ISBN'],values='Book-Rating').fillna(0).T
    df.head()

    df.index = df.join(df_books.set_index('ISBN'))['Book-Title']

    df = df.sort_index()
    df.head()

    df.loc["The Queen of the Damned (Vampire Chronicles (Paperback))"][:5]

    model = NearestNeighbors(metric='cosine')
    model.fit(df.values)

    df.iloc[0].shape

    title = 'The Queen of the Damned (Vampire Chronicles (Paperback))'
    df.loc[title].shape

    distance, indice = model.kneighbors([df.loc[title].values], n_neighbors=6)

    print(distance)
    print(indice)

    df.iloc[indice[0]].index.values

    pd.DataFrame({
        'title'   : df.iloc[indice[0]].index.values,
        'distance': distance[0]
    }) \
    .sort_values(by='distance', ascending=True)

    # function to return recommended books - this will be tested
    def get_recommends(title = ""):
        try:
            book = df.loc[title]
        except KeyError as e:
            print('The given book', e, 'does not exist')
            return

        distance, indice = model.kneighbors([book.values], n_neighbors=6)

        recommended_books = pd.DataFrame({
            'title'   : df.iloc[indice[0]].index.values,
            'distance': distance[0]
            }) \
            .sort_values(by='distance', ascending=True) \
            .head(6).values

        return [title, recommended_books]

    books = get_recommends("The Queen of the Damned (Vampire Chronicles (Paperback))")
    recommended_books = books
    return recommended_books

# Request model
class BookRequest(BaseModel):
    title: str

# Function to fetch book details from Google Books API
def fetch_book_details(book_title: str):
    url = f"https://www.googleapis.com/books/v1/volumes?q={book_title}"
    response = requests.get(url)
    if response.status_code == 200:
        books = response.json().get("items", [])
        if books:
            return {
                "title": books[0]["volumeInfo"].get("title", "Unknown Title"),
                "authors": books[0]["volumeInfo"].get("authors", []),
                "thumbnail": books[0]["volumeInfo"].get("imageLinks", {}).get("thumbnail", ""),
                "infoLink": books[0]["volumeInfo"].get("infoLink", ""),
            }
    return None

@app.post("/recommend")
async def recommend_books(book: BookRequest):
    recommendations = get_recommendations(book.title)
    enriched_recommendations = []

    for recommended_book in recommendations:
        book_info = fetch_book_details(recommended_book)
        if book_info:
            enriched_recommendations.append(book_info)

    return {"recommended_books": enriched_recommendations}
