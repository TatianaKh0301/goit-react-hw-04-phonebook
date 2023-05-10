import React, {useState, useEffect} from "react";
import shortid from "shortid";
import toast, { Toaster } from 'react-hot-toast';
import {AppWrapper} from "./App.styled";
import { FormAddContacts } from "components/FormAddContacts";
import { Filter } from "components/Filter";
import { ContactsList } from "components/ContactsList";


export default function App() {
    
    const [contacts, setContacts] = useState(() => {
          return JSON.parse(window.localStorage.getItem('contacts')) ?? '';
      });

    const [filter, setFilter] = useState('');
  
    const addContacts = (values) => {
        const { name, number } = values;
        const normalizedName = name.toLowerCase();
        const findName = contacts.find(contact => contact.name.toLocaleLowerCase() === normalizedName);
        if (findName !== undefined) {
            toast.error(`${name} is already in contacts`);
        } 
        else 
        {
            const contact = {
                id: shortid.generate(),
                name,
                number
            };
            setContacts([contact, ...contacts]);   
      }      
    };

    const changeFilter = event => {
      setFilter(event.currentTarget.value);
    };

    const getVisibleContacts= () => {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter),  
      );      
    };

    const deleteContact = contactId => {
      setContacts(contacts.filter(contact => contact.id !== contactId));
    };

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const visibleContacts = getVisibleContacts();

    return (
        <AppWrapper>
            <FormAddContacts onSubmit={addContacts}/>
            <Toaster />
            <Filter value={filter} onChange={changeFilter}/>
            <ContactsList contacts={visibleContacts} onDeleteContact={deleteContact}/>
        </AppWrapper>
    );    
};
