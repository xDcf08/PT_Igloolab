import React, { useState } from 'react';
import {
  Alert, FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';

import { Product, staticProducts as initialProducts } from '../data/products';


interface ModalProps {
    isVisible: boolean;
    onClose: () => void;
    product: Product | null;
    onDelete: (id: string) => void;
}


// --- Componente para mostrar los datos ---
const ProductData = ({ name, price }: Omit<Product, 'description'>) => (
  <View style={styles.productData}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.price}>${price.toFixed(2)}</Text>
  </View>
);

// --- NUEVO: Componente Modal de Detalle/Eliminar ---
const ProductDetailModal = ({ isVisible, onClose, product, onDelete } : ModalProps) => {
    if (!product) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            {/* Pressable para cerrar el modal al tocar fuera */}
            <Pressable style={styles.centeredView} onPress={onClose}>
                <View style={styles.modalView} onStartShouldSetResponder={() => true}>
                    <Text style={styles.modalTitle}>{product.name}</Text>
                    <Text style={styles.modalDescription}>Descripción: {product.description}</Text>
                    <Text style={styles.modalPrice}>Precio: ${product.price.toFixed(2)}</Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.buttonClose]}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.modalButton, styles.buttonDelete]}
                            onPress={() => {
                                onDelete(product.id);
                                onClose(); // Cierra el modal después de eliminar
                            }}
                        >
                            <Text style={styles.textStyle}>Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};


// --- Componente Principal ---
const ProductList = () => {
    const [products, setProducts] = useState(initialProducts);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDelete = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        Alert.alert("Eliminado", "Producto eliminado de la lista.");
    };

    const handleItemClick = (item: Product) => {
        setSelectedProduct(item);
        setModalVisible(true);
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        <TouchableOpacity 
            key={item.id}
            style={styles.touchableContainer}
            onPress={() => handleItemClick(item)}
        >
            <View style={styles.item}>
                <ProductData name={item.name} price={item.price} id={item.id} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.safeArea}>
            <Text style={styles.header}>Catálogo de Productos (Mobile Estático)</Text>
            
            <FlatList
                data={products}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={renderProductItem}
            />

            <ProductDetailModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                product={selectedProduct}
                onDelete={handleDelete}
            />
        </View>
    );
}

// --- Estilos ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingTop: Platform.OS === 'android' ? 35 : 0, 
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    // Estilo del contenedor del item (para dar sombra)
    touchableContainer: {
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3, 
        backgroundColor: '#FFFFFF', 
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        width: '100%',
    },
    productData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        maxWidth: '70%',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#007AFF',
    },
    // --- Estilos del Modal ---
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'left',
        width: '100%',
        color: '#333',
    },
    modalPrice: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'left',
        width: '100%',
        color: '#007AFF',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
    },
    modalButton: {
        borderRadius: 8,
        padding: 12,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonClose: {
        backgroundColor: '#9B9B9B',
    },
    buttonDelete: {
        backgroundColor: '#FF3B30',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductList;