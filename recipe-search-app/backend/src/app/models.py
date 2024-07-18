from sqlalchemy import Column, Integer, String, ForeignKey
from app.config import Base
# from sqlalchemy.orm import relationship

# class User(Base):
#     __tablename__ = "users"
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String(100), unique=True, index=True)
#     email = Column(String(100), unique=True, index=True)
#     favorites = relationship("Favorite", back_populates="user")

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    season = Column(String(5), index=True)
    title = Column(String(100), index=True)
    description = Column(String(500))

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True) 
    season = Column(String(5), index=True)
    title = Column(String(100), index=True)
    description = Column(String(500))

    # user = relationship("User", back_populates="favorites")

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
