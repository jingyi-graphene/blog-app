from fastapi import APIRouter, Depends, HTTPException, status
from repository import user
import oauth2
import database, schemas, models
from sqlalchemy.orm import Session
router= APIRouter(tags=["Users"], prefix="/user")
 
@router.post('', status_code=status.HTTP_201_CREATED, response_model=schemas.ShowUser)
def create_user(request: schemas.User, db: Session=Depends(database.get_db), current_user: schemas.User= Depends(oauth2.get_current_user)):
    return user.create_user(request, db)


@router.get('/{id}', response_model=schemas.ShowUser)
def get_user(id:int, db: Session = Depends(database.get_db), current_user: schemas.User= Depends(oauth2.get_current_user)):
    return user.get_user(id, db)
