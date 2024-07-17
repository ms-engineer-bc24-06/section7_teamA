from sqlalchemy import Column, Integer, String
from .config import Base

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    season = Column(String(5), index=True)
    title = Column(String(100), index=True)
    description = Column(String(500))

class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, index=True)
    season = Column(String(5), index=True)
    title = Column(String(100), index=True)
    description = Column(String(500))